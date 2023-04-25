Imports System
Imports System.Collections.Generic
Imports System.Text
Imports System.Xml
Imports System.Xml.Serialization

Namespace mosprotocol
    <XmlRoot("mos")>
    Public Class cMOS
        Private _mosID, _ncsID As String
        Private _messageID As Long
        Private _heartbeat As cHeartBeat

        Public Property mosID As String
            Get
                Return _mosID
            End Get
            Set(ByVal value As String)
                _mosID = value
            End Set
        End Property

        Public Property ncsID As String
            Get
                Return _ncsID
            End Get
            Set(ByVal value As String)
                _ncsID = value
            End Set
        End Property

        Public Property messageID As Long
            Get
                Return _messageID
            End Get
            Set(ByVal value As Long)
                _messageID = value
            End Set
        End Property

        Public Property heartbeat As cHeartBeat
            Get
                Return _heartbeat
            End Get
            Set(ByVal value As cHeartBeat)
                _heartbeat = value
            End Set
        End Property
    End Class
End Namespace
